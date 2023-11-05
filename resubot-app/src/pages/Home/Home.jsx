import React, {useState} from "react";
import axios from "axios";
import "./Home.scss";
import HomeToolBar from "../../components/HomeToolBar/HomeToolBar.jsx";
import Profiles from "../../components/Profiles/Profiles.jsx";

const Home = () => {
    const [fullName, setFullName] = useState("");
    const [currentPosition, setCurrentPosition] = useState("");
    const [currentLength, setCurrentLength] = useState(1);
    const [currentTechnologies, setCurrentTechnologies] = useState("");
    const [companyInfo, setCompanyInfo] = useState([{name: "", position: ""}]);

    const handleAddCompany = () =>
        setCompanyInfo([...companyInfo, {name: "", position: ""}]);

    const handleRemoveCompany = (index) => {
        const list = [...companyInfo];
        list.splice(index, 1);
        setCompanyInfo(list);
    };

    const handleUpdateCompany = (e, index) => {
        const {name, value} = e.target;
        const list = [...companyInfo];
        list[index][name] = value;
        setCompanyInfo(list);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("currentPosition", currentPosition);
        formData.append("currentLength", currentLength);
        formData.append("currentTechnologies", currentTechnologies);
        formData.append("workHistory", JSON.stringify(companyInfo));
        axios
            .post("http://localhost:4000/resume/create", formData, {})
            .then((res) => {
                if (res.data.message) {
                    console.log(res.data.data);
                }
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className="home-wrapper">
            <div className="home-content">
                {/*Dashboard Stats*/}
                <nav className="level is-mobile">
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading">Total Profiles</p>
                            <p className="title">12</p>
                        </div>
                    </div>
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading">Total Resumes</p>
                            <p className="title">23</p>
                        </div>
                    </div>
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading">Total Cover Letters</p>
                            <p className="title">13</p>
                        </div>
                    </div>
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading">Completed Profiles </p>
                            <p className="title">60%</p>
                        </div>
                    </div>
                </nav>

                {/*Tool Bar*/}
                <div className="toolbar-bar"/>
                <HomeToolBar/>
                <div className="toolbar-bar"/>

                {/*Profiles*/}
                <Profiles/>

                <form
                    onSubmit={handleFormSubmit}
                    method="POST"
                    encType="multipart/form-data"
                >
                    <label htmlFor="fullName">Enter your full name</label>
                    <input
                        type="text"
                        required
                        name="fullName"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <div className="nestedContainer">
                        <div>
                            <label htmlFor="currentPosition">Current Position</label>
                            <input
                                type="text"
                                required
                                name="currentPosition"
                                className="currentInput"
                                value={currentPosition}
                                onChange={(e) => setCurrentPosition(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="currentLength">For how long? (year)</label>
                            <input
                                type="number"
                                required
                                name="currentLength"
                                className="currentInput"
                                value={currentLength}
                                onChange={(e) => setCurrentLength(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="currentTechnologies">Technologies used</label>
                            <input
                                type="text"
                                required
                                name="currentTechnologies"
                                className="currentInput"
                                value={currentTechnologies}
                                onChange={(e) => setCurrentTechnologies(e.target.value)}
                            />
                        </div>
                    </div>
                    <h3>Companies you've worked at</h3>
                    {companyInfo.map((company, index) => (
                        <div className="nestedContainer" key={index}>
                            <div className="companies">
                                <label htmlFor="name">Company Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    onChange={(e) => handleUpdateCompany(e, index)}
                                />
                            </div>
                            <div className="companies">
                                <label htmlFor="position">Position Held</label>
                                <input
                                    type="text"
                                    name="position"
                                    required
                                    onChange={(e) => handleUpdateCompany(e, index)}
                                />
                            </div>

                            <div className="btn__group">
                                {companyInfo.length - 1 === index && companyInfo.length < 4 && (
                                    <button id="addBtn" onClick={handleAddCompany}>
                                        Add
                                    </button>
                                )}
                                {companyInfo.length > 1 && (
                                    <button
                                        id="deleteBtn"
                                        onClick={() => handleRemoveCompany(index)}
                                    >
                                        Del
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

                    <button>CREATE RESUME</button>
                </form>
            </div>
        </div>
    );
};

export default Home;
