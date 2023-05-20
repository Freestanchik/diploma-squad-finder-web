import {Field, Form, Formik} from "formik";
import GamePlatformsField from "../gamePlatformsField/GamePlatformsField.jsx";
import "./searchParams.scss"
import {useDispatch} from "react-redux";
import {setPage, setSearchFilters} from "../../store/slices/gameSessionSlice.js";

const SearchParamsForm = () => {

    const dispatch = useDispatch();

    const initialValues = {
        gameName: '',
        gamePlatforms: [],
        minSkillLevel: 0,
        maxRequiredPlayers: '',
    };

    const handleSubmit = (values) => {
        dispatch(setPage(1))
        dispatch(setSearchFilters(values))
    };

    const handleResetForm = () => {
        dispatch(setPage(1))
        dispatch(setSearchFilters(""))
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            {({setFieldValue}) => (
                <Form className="form">
                    <div className={"form-container"}>
                        <h3>Параметри пошуку</h3>

                        <div>
                            <label htmlFor="gameName">Назва гри</label>
                            <Field type="text" id="gameName" name="gameName"/>
                        </div>

                        <GamePlatformsField/>

                        <div className="minSkillLevel">
                            <label htmlFor="minSkillLevel">Мін. рівень гри</label>
                            <div className="minSkillLevel__main">
                                <Field type="range" id="minSkillLevel" name="minSkillLevel" min={0} max={10} step={1}
                                       onChange={(e) => setFieldValue('minSkillLevel', e.target.value)}/>
                                <Field
                                    type="text"
                                    id="minSkillLevel"
                                    name="minSkillLevel"
                                    className="minSkillLevel_number"
                                    readOnly
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="maxRequiredPlayers">Макс. кількість гравців</label>
                            <Field type="number" id="maxRequiredPlayers" name="maxRequiredPlayers"/>
                        </div>

                        <button type="submit">
                            Пошук
                        </button>
                        <button className="btn-reset" type="button" onClick={() => {
                            handleResetForm()
                            resetForm()
                        }}>
                            Reset
                        </button>
                    </div>

                </Form>
            )}
        </Formik>
    );
};

export default SearchParamsForm