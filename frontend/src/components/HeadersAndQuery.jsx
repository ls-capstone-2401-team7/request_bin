const HeadersAndQuery = ({ obj }) => {
  const array = Object.entries(obj);

  return (
    <>
      {array.map((nestedArr, idx) => {
        return <p key={idx}> {nestedArr[0]}: {nestedArr[1]}</p>
      })}
    </>
  );
};

export default HeadersAndQuery;
