const HeadersAndQuery = ({ obj, type }) => {
  const array = Object.entries(obj);

  return (
    <>
      <b>{type}</b>
      {array.map((nestedArr, idx) => {
        return (
        <> 
          <p key={idx}> {nestedArr[0]}: {nestedArr[1]}</p>
        </>

      )
      })}
    </>
  );
};

export default HeadersAndQuery;
