// const Pizza = (props) => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", {}, props.name),
//     React.createElement("p", {}, props.description),
//   ]);
// };

//let counter = 0;
const Pizza = (props) => {
    
    //counter = counter++;
   // counter = Date.now();

    return(
        <div className="pizza">
            <h1> {props.name} </h1>
            <p> {props.description} </p>
            <img src= {props.image ? props.image : "https://picsum.photos/200"} alt={props.name} />
        </div>
    )
}

export default Pizza;