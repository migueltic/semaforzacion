export default function NoFileSVG(props) {
  return (
    <svg
      className="w-14 h-14 fill-gray-200"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
  
      {...props}
    >
      <path d="M11 15h2V9h3l-4-5-4 5h3z" />
      <path d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2v7z" />
    </svg>
  );
}