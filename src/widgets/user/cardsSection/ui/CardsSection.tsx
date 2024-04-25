import { StandartCard } from "@/features/user/standartCard";
import styles from "./styles.module.scss";
import { FC } from "react";
import { CardSceletonProps } from "../model/types";
import { CardSceleton } from "@/shared/ui";

const CardsSection: FC<CardSceletonProps> = ({ isLoading = true, isError = false }) => {
   const readyData = isError ? (
      <h3 className="h3">Упс, произошла ошибка 😅</h3>
   ) : isLoading ? (
      [...Array(8)].map((_, i: number) => <CardSceleton key={i} />)
   ) : (
      [...Array(24)].map((_, i) => <StandartCard key={i} />)
   );

   return <section className={styles.section}>{readyData}</section>;
};

export default CardsSection;
