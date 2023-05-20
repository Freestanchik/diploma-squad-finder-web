import {Field, FieldArray} from "formik";

import "./gamePlatformsField.scss"

const GamePlatformsField = () => {
    return(
        <FieldArray name="gamePlatforms">
            {() => (
                <div className="game-platforms-container">
                    <label className="game-platforms-label">Ігрові платформи:</label>
                    <div className="game-platforms-checkboxes">
                        {['ps4', 'ps5', 'xbox', 'switch', 'pc', 'mobile'].map((platform) => (
                            <label key={platform} className="checkbox-label">
                                <Field type="checkbox" name="gamePlatforms" value={platform}/>
                                {platform}
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </FieldArray>
    )
}

export default GamePlatformsField