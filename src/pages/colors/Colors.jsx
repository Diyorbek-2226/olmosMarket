import { colorGetAll } from "../../service/api/color"
import { useEffect, useState } from "react";

export default function Colors() {
    const[color, SetColor]=useState({})
    colorGetAll().then(res=> console.log(res)
    
)
  return (
    <div>salom</div>
  )
}
