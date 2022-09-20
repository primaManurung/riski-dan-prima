
import React, { useState } from "react";

const ChangePassword = () =>{
    const [password,setPassword]                 = useState('')
    const [confirmPass,setConfirmPass]           = useState('')
    const [errorPassword,setErrorPassword]       = useState('')
    const [errorConfirmPass,setErrorConfirmPass] = useState('')


    const gantiPassword = (x) =>{
        const isi = x.target.value
        setPassword(isi)
        if(!isi){
            setErrorPassword('password kosong')
        } else {
            setErrorPassword('')
        }
    }

    const changeConfirmPass = (x) =>{
        const isi = x.target.value
        setConfirmPass(isi)
        if(!isi){
            setErrorConfirmPass('password konfirmasi kosong')
        } else if(password !== isi){
            setErrorConfirmPass('password konfirmasi tidak cocok')
        } else {
            setErrorConfirmPass('')
        }
    }


    return(
        <div>
            <div className="box">
                <div className="isiBox">
                <div className="gantiPass">
                        <label>Old Password</label>
                        <input type="password" placeholder="masukan password lama" className="gayaForm" value={password} onChange={gantiPassword}/>
                        {errorPassword && (
                                <p className="text-danger">{errorPassword}</p>
                            )}
                    </div>
                    <div className="gantiPass">
                        <label>New Password</label>
                        <input type="password" placeholder="masukan password baru" className="gayaForm" value={password} onChange={gantiPassword}/>
                        {errorPassword && (
                                <p className="text-danger">{errorPassword}</p>
                            )}
                    </div>

                    <div className="gantiPass">
                        <label>Confirm Password</label>
                        <input type="password" placeholder="ulangi password" classname="gayaForm" value={confirmPass} onChange={changeConfirmPass}/>
                        {errorConfirmPass && (
                                <p className="text-danger">{errorConfirmPass}</p>
                            )}
                    </div>

                    <button className="tombolChangePassword">Simpan</button>{' '}
                </div>
            </div>
        </div>
    )
}

export default ChangePassword