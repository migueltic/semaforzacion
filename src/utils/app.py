import os
import tarfile
import urllib.request
import tensorflow as tf
import numpy as np
import cv2
import base64
from flask import Flask, request, jsonify
from flask_cors import CORS
from io import BytesIO
from PIL import Image

app = Flask(__name__)
CORS(app)

# Function to download the model
def download_model():
    MODEL_NAME = 'ssd_mobilenet_v2_coco_2018_03_29'
    MODEL_FILE = MODEL_NAME + '.tar.gz'
    DOWNLOAD_BASE = 'http://download.tensorflow.org/models/object_detection/'

    if not os.path.exists(MODEL_NAME):
        print("Downloading model...")
        urllib.request.urlretrieve(DOWNLOAD_BASE + MODEL_FILE, MODEL_FILE)
        print("Extracting model...")
        with tarfile.open(MODEL_FILE) as tar:
            tar.extractall()
        os.remove(MODEL_FILE)
        print("Model downloaded and extracted.")
    else:
        print("Model already downloaded.")

# Download the model
download_model()

# Load the object detection model
def load_model():
    MODEL_NAME = 'ssd_mobilenet_v2_coco_2018_03_29'
    PATH_TO_SAVED_MODEL = os.path.join(MODEL_NAME, 'saved_model')
    print('Loading model...', PATH_TO_SAVED_MODEL)
    detect_fn = tf.saved_model.load(PATH_TO_SAVED_MODEL)
    print('Model loaded.')
    return detect_fn

# Load the model
model = load_model()

# Function to detect objects
def detect_objects(image, model):
    input_tensor = tf.convert_to_tensor(image)
    input_tensor = input_tensor[tf.newaxis, ...]

    detections = model.signatures['serving_default'](input_tensor)

    # All detected boxes, classes, and scores
    bboxes = detections['detection_boxes'].numpy()[0]
    classes = detections['detection_classes'].numpy()[0].astype(np.int64)
    scores = detections['detection_scores'].numpy()[0]

    return bboxes, classes, scores

# Function to determine the traffic light color
def get_traffic_light_color(image, bbox):
    ymin, xmin, ymax, xmax = bbox
    (height, width, _) = image.shape
    (left, right, top, bottom) = (xmin * width, xmax * width, ymin * height, ymax * height)

    # Extract only the traffic light region
    traffic_light = image[int(top):int(bottom), int(left):int(right)]

    # Apply adaptive thresholding to improve color detection
    traffic_light_gray = cv2.cvtColor(traffic_light, cv2.COLOR_BGR2GRAY)
    traffic_light_blur = cv2.GaussianBlur(traffic_light_gray, (5, 5), 0)
    adaptive_thresh = cv2.adaptiveThreshold(traffic_light_blur, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)

    # Define color ranges in HSV
    hsv = cv2.cvtColor(traffic_light, cv2.COLOR_BGR2HSV)
    red_lower = np.array([0, 100, 100])
    red_upper = np.array([10, 255, 255])
    yellow_lower = np.array([20, 100, 100])
    yellow_upper = np.array([30, 255, 255])
    green_lower = np.array([50, 100, 100])
    green_upper = np.array([70, 255, 255])

    mask_red = cv2.inRange(hsv, red_lower, red_upper)
    mask_yellow = cv2.inRange(hsv, yellow_lower, yellow_upper)
    mask_green = cv2.inRange(hsv, green_lower, green_upper)

    # Apply morphological operations to improve color detection
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    mask_red = cv2.morphologyEx(mask_red, cv2.MORPH_OPEN, kernel)
    mask_yellow = cv2.morphologyEx(mask_yellow, cv2.MORPH_OPEN, kernel)
    mask_green = cv2.morphologyEx(mask_green, cv2.MORPH_OPEN, kernel)

    # Count non-zero pixels for each color mask
    red_count = cv2.countNonZero(cv2.bitwise_and(mask_red, adaptive_thresh))
    yellow_count = cv2.countNonZero(cv2.bitwise_and(mask_yellow, adaptive_thresh))
    green_count = cv2.countNonZero(cv2.bitwise_and(mask_green, adaptive_thresh))

    if red_count > yellow_count and red_count > green_count:
        return 'Red'
    elif yellow_count > red_count and yellow_count > green_count:
        return 'Yellow'
    else:
        return 'Green'
    

def draw_boxes(image, bboxes, classes, scores, threshold=0.5):
    for i in range(len(bboxes)):
        if scores[i] > threshold and classes[i] == 10:  # Class 10 is traffic light in the COCO model
            ymin, xmin, ymax, xmax = bboxes[i]
            (height, width, _) = image.shape
            (left, right, top, bottom) = (xmin * width, xmax * width, ymin * height, ymax * height)
            color = get_traffic_light_color(image, bboxes[i])
            cv2.rectangle(image, (int(left), int(top)), (int(right), int(bottom)), (0, 255, 0), 2)
            cv2.putText(image, color, (int(left), int(top) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (36,255,12), 2)
    return image

@app.route('/detectar_color', methods=['POST'])
def detectar_color():
    if 'file' not in request.files:
        return jsonify({"error": "No file part", "status": 400}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file", "status": 400}), 400
    if file:
        image = np.fromstring(file.read(), np.uint8)
        image = cv2.imdecode(image, cv2.IMREAD_COLOR)

        # Detect objects
        bboxes, classes, scores = detect_objects(image, model)

        result = []
        for i in range(len(bboxes)):
            if scores[i] > 0.5 and classes[i] == 10:  # Class 10 is traffic light in the COCO model
                color = get_traffic_light_color(image, bboxes[i])
                result.append({"color": color, "bbox": bboxes[i].tolist()})

        # Draw boxes on the image
        image_with_boxes = draw_boxes(image, bboxes, classes, scores)

        # Convert the image to base64
        _, buffer = cv2.imencode('.jpg', image_with_boxes)
        image_base64 = base64.b64encode(buffer).decode('utf-8')

        return jsonify({"detections": result, "image": image_base64, "status": 200})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
