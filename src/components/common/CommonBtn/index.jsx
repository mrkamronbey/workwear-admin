import React from "react";
import { Button } from "./styled-index";
import { motion } from "framer-motion";
import './style.css'

const CommonBtn = ({ children, type, onClick, style }) => {
  return (
    <>
      <motion.button
        className="common_btn"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }} type={type} style={style} onClick={onClick}>
        {children}
      </motion.button>
    </>
  );
};

export default CommonBtn;
