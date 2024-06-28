const Result = (props) => {
    const {part} = props
    console.log("result",props)
    return (
        <div className="container">{part}</div>
    )
}
// Result.propTypes = {
//     part: Proptypes.string
// }

export default Result;