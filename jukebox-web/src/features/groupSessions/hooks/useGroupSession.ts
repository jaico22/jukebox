import { useContext } from "react";
import { GroupSessionContext } from "../GroupSessionProvider";

export const useGroupSession = () => useContext(GroupSessionContext);