import Image from "next/image";
import styles from "./page.module.css";
import {ToDoList} from './components/first';

export default function Home() {
  return (
    <ToDoList />
  );
}
