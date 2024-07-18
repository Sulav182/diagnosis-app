const Result = (props) => {
    const {data} = props
    console.log("result",props)
    return (
        <div className="container">{data.bodyPart+ ' ' + data.symptoms}</div>
    )
}
// Result.propTypes = {
//     data: Proptypes.object
// }

export default Result;