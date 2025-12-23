import React from "react";
import {createRoot} from "react-dom/client";
import viteLogo from '/vite.svg'

const mainDiv = document.getElementById("root");


const Heading = () => {
    return <h1>The library for web and native user interfaces</h1>;
};

const Paragraph = () => {
    return (
        <p>
            React allows you to build UI using small, reusable components. Each
            component handles its own structure and logic.
        </p>
    );
};


const ImageComponent = () => {
    return (
        <img src={viteLogo} className="logo" alt="Vite logo" />
    );
};

const ListComponent = () => {
    return (
        <ul>
            <li>React</li>
            <li>JavaScript</li>
            <li>Redux Tool kit  </li>
            <li>JSX</li>
        </ul>
    );
};


const TableComponent = () => {
    return (
        <table border={"1px"}>
            <tr>
                <th>Company</th>
                <th>Contact</th>
                <th>Country</th>
            </tr>
            <tr>
                <td>Alfreds Futterkiste</td>
                <td>Maria Anders</td>
                <td>Germany</td>
            </tr>
            <tr>
                <td>Centro comercial Moctezuma</td>
                <td>Francisco Chang</td>
                <td>Mexico</td>
            </tr>
        </table>
    );
};

createRoot(mainDiv).render(
    <div>
        <Heading/>
        <Paragraph/>
        <ImageComponent/>
        <ListComponent/>
        <TableComponent/>
    </div>
);
