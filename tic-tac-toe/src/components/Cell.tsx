function Cell ({ value, onClick }) {
  const style = {
    width: '80px',
    height: '80px',
    border: '1px solid black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '2rem',
    cursor: 'pointer'
  }

  return (
    <div style={style} onClick={onClick}>
      {value}
    </div>
  )
}

export default Cell
