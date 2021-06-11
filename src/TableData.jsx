function TableData(props) {

    return (
        <tr key={props.id}>
            <td>{props.name}</td>
            <td>{props.city}</td>
            <td>{props.state}</td>
            <td>{props.telephone}</td>
            <td>{props.genre}</td>
        </tr>
    );
}


export default TableData;