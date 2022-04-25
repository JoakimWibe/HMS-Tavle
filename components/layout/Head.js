import NextHead from "next/head";

const Head = ({ title = "", description }) => {
  return (
    <NextHead>
      <title>
        {title}
        {title ? " | " : ""}HMS-Tavle
      </title>
      <meta name="description" content={description} />
    </NextHead>
  );
};

export default Head;
