"use client";

import React, { useState } from "react";
import { Button, InputField, Select, TextArea } from "@/shared/ui";
import { organizationsData } from "../model/organizations.data";
import styles from "./styles.module.scss";

const roles = [
   { value: "Утюжник", postValue: "Утюжник" },
   { value: "Швея", postValue: "Швея" },
   { value: "Менеджер", postValue: "Менеджер" },
];

const PositionForm = () => {
   const [selected, setSelected] = useState(organizationsData[0]);
   const [selectedRole, setSelectedRole] = useState(roles[0]);

   return (
      <form className={styles.position}>
         <div className={styles.position__row}>
            <h4 className="h4">Организация должности</h4>
            <Select
               selected={selected}
               setSelected={setSelected}
               title="Организация"
               data={organizationsData}
            />
            <Select
               selected={selectedRole}
               setSelected={setSelectedRole}
               title="Должности"
               data={roles}
            />
            <h4 className="h4">Название должности</h4>
            <InputField
               title="Название"
               type="email"
               placeholder={selectedRole.value ? selectedRole.value : ""}
            />

            <h4 className="h4">Описание должности</h4>
            <TextArea title="Описание" />
         </div>

         <div className={styles.position__btn}>
            <Button>Создать</Button>
         </div>
      </form>
   );
};

export default PositionForm;
