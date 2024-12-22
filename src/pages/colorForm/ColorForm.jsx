import React, { useRef } from "react";
import { createColor } from "../../service/api/color";

export default function ColorForm() {
  const nameRef = useRef(null);
  const hexRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: nameRef.current.value, // Inputdagi qiymatni olish
      hex: hexRef.current.value,
    };

    try {
      const response = await createColor(formData);
      console.log("Yangi rang qo'shildi:", response.data);
      alert("Rang muvaffaqiyatli qo'shildi!");
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
      alert("Rangni qo'shishda xatolik yuz berdi.");
    }
  };

  return (
    <div>
      <h1>Yangi Rang Qo'shish</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Rang nomi:</label>
          <input
            type="text"
            id="name"
            ref={nameRef} // useRef bilan bog'lanish
            required
          />
        </div>
        <div>
          <label htmlFor="hex">Rang HEX kodi:</label>
          <input
            type="color"
            id="hex"
            ref={hexRef} // useRef bilan bog'lanish
            required
          />
        </div>
        <button type="submit">Qo'shish</button>
      </form>
    </div>
  );
}
