interface Props {

};

const Spinner: React.FC<Props> = (props) => {
  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="lds-ring">
        <div></div><div></div><div></div><div></div>
      </div>
    </div>
  )
}

export default Spinner;