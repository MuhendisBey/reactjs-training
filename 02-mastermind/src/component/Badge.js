import React from "react";

/**
 *  Stateles component olusturacagiz.
 *  Function yazarak stateless component olusturacagiz.
 *      Class olusturarak da olusturabilir miyiz ?
 *  Uzerinde state tutmayacak
 *  Dogrudan view return edecek.
 *  state parametre uzerinden gecilecek props olarak
 *  Eger stateless component'i class olarak olusturursam nesne yaratiyor.
 *      Nesne yaratmak maliyetli. function nesne gibi degil kullanildigi yerlerde tekrar tekrar cagirilmiyor
 *
 */

function Badge(props)
{
    return (
    <div className="form-group">
        <label htmlFor={props.id}>{props.label}:</label>
        <span className="badge alert-info" id={props.id}>{props.value}</span>
    </div>
    )
}

export default Badge;