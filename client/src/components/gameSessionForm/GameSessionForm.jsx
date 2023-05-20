import {ErrorMessage, Field, FieldArray, Form, Formik} from "formik";
import "./gameSessionForm.scss"
import {useDispatch} from "react-redux";
import {createGameSession} from "../../store/slices/gameSessionSlice.js";
import {toast} from "react-toastify";
import GamePlatformsField from "../gamePlatformsField/GamePlatformsField.jsx";

const GameSessionForm = () => {
    const dispatch = useDispatch();

    const initialValues = {
        gameName: '',
        gamePlatforms: [],
        skillLvl: '',
        requiredPlayers: '',
        sessionDate: '',
        timeStart: '',
        timeEnd: '',
        additionalInfo: ''
    };

    const validate = (values) => {
        const errors = {};

        if (!values.gameName) {
            errors.gameName = 'Game Name is required';
        }

        return errors;
    };

    const handleSubmit = (values, {resetForm}) => {
        dispatch(createGameSession(values));
        toast("ігрову сесію успішно додано!")
        resetForm()
    };

    return (
        <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
            <Form className="new-game-session-form">
                <label>
                    Game Name:
                    <Field type="text" name="gameName"/>
                </label>
                <ErrorMessage name="gameName" component="div" className="error"/>

                <GamePlatformsField/>

                <ErrorMessage name="gamePlatforms" component="div" className="error"/>
                <label>
                    Skill Level:
                    <Field type="number" name="skillLvl" min="1" max="10"/>
                </label>
                <ErrorMessage name="skillLvl" component="div" className="error"/>

                <label>
                    Required Players:
                    <Field type="number" name="requiredPlayers" min="1"/>
                </label>
                <ErrorMessage name="requiredPlayers" component="div" className="error"/>

                <label>
                    Session Date:
                    <Field type="date" name="sessionDate"/>
                </label>
                <ErrorMessage name="sessionDate" component="div" className="error"/>

                <label>
                    Time Start:
                    <Field type="time" name="timeStart"/>
                </label>
                <ErrorMessage name="timeStart" component="div" className="error"/>

                <label>
                    Time End:
                    <Field type="time" name="timeEnd"/>
                </label>
                <ErrorMessage name="timeEnd" component="div" className="error"/>

                <label>
                    Additional Info:
                    <Field as="textarea" name="additionalInfo"/>
                </label>
                <ErrorMessage name="additionalInfo" component="div" className="error"/>

                <button type="submit">Create Game Session</button>
            </Form>
        </Formik>
    );
}

export default GameSessionForm