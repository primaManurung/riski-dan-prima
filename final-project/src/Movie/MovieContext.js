import { createContext, useState } from "react";

export const BuahContext = createContext()

export const BuahProvider = (props)=>{    
    var daftarBuah = [
        {nama: "Nanas", hargaTotal: 100000, beratTotal: 4000 },
        {nama: "Manggis", hargaTotal: 350000, beratTotal: 10000},
        {nama: "Nangka", hargaTotal: 90000, beratTotal: 2000},
        {nama: "Durian", hargaTotal: 400000, beratTotal: 5000},
        {nama: "Strawberry", hargaTotal: 120000, beratTotal: 6000}
    ]
    const [movie, setMovie] = useState(daftarBuah)
    const [showForm, setShowForm] = useState(false) // state for show form edit or create
    const [statusForm, setStatusForm] = useState("create") // state for status form edit or create
    const [currentIndex, setCurrentIndex] = useState(-1) // state for currentIndex (for handleEdit function)

    let state = {
        buahState: [buah, setBuah],
        showFormState: [showForm, setShowForm],
        statusFormState: [statusForm, setStatusForm],
        currentIndex: [currentIndex, setCurrentIndex]
    }


    return(
        <BuahContext.Provider value={state}>
            {props.children}
        </BuahContext.Provider>
    )
}
