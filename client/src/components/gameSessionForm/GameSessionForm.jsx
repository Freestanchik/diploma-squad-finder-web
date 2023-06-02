import {ErrorMessage, Field, Form, Formik} from "formik";
import "./gameSessionForm.scss"
import {useDispatch} from "react-redux";
import {createGameSession, editGameSession} from "../../store/slices/gameSessionSlice.js";
import {toast} from "react-toastify";
import GamePlatformsField from "../gamePlatformsField/GamePlatformsField.jsx";

const GameSessionForm = ({gameSession}) => {
    const dispatch = useDispatch();

    let initialValues = {
        gameName: gameSession && gameSession.gameName || '',
        gamePlatforms: gameSession && gameSession.gamePlatforms || [],
        skillLvl: gameSession && gameSession.skillLvl || '',
        requiredPlayers: gameSession && gameSession.requiredPlayers || '',
        sessionDate: gameSession && gameSession.sessionDate &&  gameSession.sessionDate.substring(0, 10) || '',
        timeStart: gameSession && gameSession.timeStart || '',
        timeEnd: gameSession && gameSession.timeEnd || '',
        additionalInfo: gameSession && gameSession.additionalInfo || ''
    };

    const validate = (values) => {
        const errors = {};

        if (!values.gameName) {
            errors.gameName = 'Game Name is required';
        }

        return errors;
    };

    const handleSubmit = (values, {resetForm}) => {
        if(!gameSession){
            dispatch(createGameSession(values));
            toast("ігрову сесію успішно додано!")
            resetForm()
        }else {
            dispatch(editGameSession({gameSessionId: gameSession._id, gameSessionData: values}))
            toast("ігрову сесію успішно змінено!")
        }

    };

    return (
        <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
            <Form className="new-game-session-form">
                <label>
                    Назва гри:
                    <Field type="text" name="gameName"/>
                </label>
                <ErrorMessage name="gameName" component="div" className="error"/>

                <GamePlatformsField/>

                <ErrorMessage name="gamePlatforms" component="div" className="error"/>
                <label>
                    Рівень гри:
                    <Field type="number" name="skillLvl" min="1" max="10"/>
                </label>
                <ErrorMessage name="skillLvl" component="div" className="error"/>

                <label>
                    Необхідна кількість гравців:
                    <Field type="number" name="requiredPlayers" min="1"/>
                </label>
                <ErrorMessage name="requiredPlayers" component="div" className="error"/>

                <label>
                    Дата проведенння:
                    <Field type="date" name="sessionDate"/>
                </label>
                <ErrorMessage name="sessionDate" component="div" className="error"/>

                <label>
                    Час початку:
                    <Field type="time" name="timeStart"/>
                </label>
                <ErrorMessage name="timeStart" component="div" className="error"/>

                <label>
                    Час кінцю:
                    <Field type="time" name="timeEnd"/>
                </label>
                <ErrorMessage name="timeEnd" component="div" className="error"/>

                <label>
                    Додаткова інформація:
                    <Field as="textarea" name="additionalInfo"/>
                </label>
                <ErrorMessage name="additionalInfo" component="div" className="error"/>

                <button type="submit">{gameSession ? "Редагувати сесію" : "Створити сесію"}</button>
            </Form>
        </Formik>
    );
}

export default GameSessionForm