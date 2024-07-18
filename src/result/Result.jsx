const Result = (props) => {
    const {part} = props
    console.log("result",props)
    return (
        <div className="container">{part.bodyPart+ ' ' + part.symptoms}</div>
    )
}
// Result.propTypes = {
//     data: Proptypes.object
// }

export default Result;