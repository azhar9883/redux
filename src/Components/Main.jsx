import { useState, useEffect } from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from '../redux/action';

const Main = () => {
    const [query, setQuery] = useState('');
    const currData = useSelector(state => state.data.data);
    const [data, setDisplayData] = useState(currData)  
    const [pokeData, setPokeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pokeDex, setPokeDex] = useState();
    const [curPage, setCurrPage] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(fetchData());

    }, [dispatch])


    useEffect(() => {
        setDisplayData(currData);
    }, [currData])


    const pokeFun = async () => {
        setLoading(true)

        if (data.results) {

            getPokemon(data.results)
        }

        setLoading(false)
    }

    // next function

    const hel = async (data, type) => {
        let page = curPage;
        if (type === "NEXT") {
            page += 1;
        } else {
            page -= 1;
        }

        setCurrPage(page)
        dispatch(fetchData(page))

    };

    // data render by name and id .
    const getPokemon = async (res) => {
        const newState = [];
        res.forEach(async (item) => {
            const result = await axios.get(item.url);
            newState.push(result.data);
        });
        setTimeout(() => {
            console.log({ newState });
            setPokeData(newState);
        }, 500);
    }
    useEffect(() => {
        pokeFun();
    }, [data])

    useEffect(() => {
        console.log({ data: data.results });
        const prevResults = data.results;
        console.log({ prevResults });
        console.log({ pokeData });
        if (prevResults) {
            let pokeDataFilteredAbilities = [];
            let pokeDataFilteredIds = [];
            const temFilteredArrayForAbilities = pokeData.filter((item) => {
                let hasAbility = false;
                const abilities = item.abilities || [];
                for (let i = 0; i < abilities.length; i++) {
                    if (abilities[i].ability.name.toLowerCase().includes(query.toLowerCase())) {
                        hasAbility = true;
                        break;
                    }
                }
                console.log({ item, hasAbility });
                return hasAbility;
            });
            const temFilteredArrayForIds = pokeData.filter((item) => item.id == query);
            if (temFilteredArrayForAbilities.length) {
                pokeDataFilteredAbilities = temFilteredArrayForAbilities.map((item) => {
                    return prevResults.find(preItem => preItem.name === item.name)
                })
            }
            if (temFilteredArrayForIds.length) {
                pokeDataFilteredIds = temFilteredArrayForIds.map((item) => {
                    return prevResults.find(preItem => preItem.name === item.name)
                })
            }

            const filteredResults = prevResults.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
            getPokemon([...filteredResults, ...pokeDataFilteredAbilities, ...pokeDataFilteredIds]);
        }
    }, [query])
    const search = (data) => {
        return data.filter((item) => item.name.toLowerCase().includes(query))
    }
    console.log({ pokeData });
    return (
        <>

            <div style={{ textAlign: "center", paddingTop: "12px", }}><input type='text' style={{ padding: "5px", borderRadius: "12px 12px" }} placeholder="search" onChange={(e) => setQuery(e.target.value)}></input> </div>
            <div className="container">
                <div className="left-content">

                    <Card pokemons={pokeData} loading={loading} infoPokemon={poke => setPokeDex(poke)} />

                    <div className="btn-group">

                        {<button onClick={() => hel(curPage, "PREV")}>Prev</button>}

                    </div>

                    <div className="btn-group">
                        {<button onClick={() => hel(curPage, "NEXT")}>Next</button>}

                    </div>
                </div>
                <div className="right-content">
                    <Pokeinfo data={pokeDex} />

                </div>
            </div>
        </>
    )
}
export default Main;