// import { useDispatch } from "react-redux";


const SearchBar = () => {

    const [input, setInput] = useState({
        inputText: "",
        search: false
    });
    //valor de la findCourse "name"

    /*const dispatch = useDispatch()*/

    const findCourse = (event) => {
        setInput({...input, inputText: event.target.value})
    }

    const search = () => {
        /*dispatch(getRecipes(found.info))*/
        setInput({...input, search: true})
    }

    // useEffect(() => {
    //     setfound({...found, info: ""})
    // }, [found.search])


    return (
        <div>
            <input type = 'search' onChange = {findCourse} value = {input.inputText} />
            <button onClick = {search}>search</button>    
        </div>
    )
}


export default SearchBar;