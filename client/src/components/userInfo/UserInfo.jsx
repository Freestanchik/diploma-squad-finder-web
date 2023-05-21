import React from "react";

const UserInfo = ({user}) => {
    return (
        <div className="profile__container">
            <h2>Інформація про користувача</h2>
            {user.login && (<div className="profile__item">
                <span className="profile__label">Логін:</span>
                <span className="profile__value">{user.login}</span>
            </div>)}

            {user.email && (<div className="profile__item">
                <span className="profile__label">Електронна пошта:</span>
                <span className="profile__value">{user.email}</span>
            </div>)}

            {user.dateOfBirth && (<div className="profile__item">
                <span className="profile__label">Дата народження:</span>
                <span className="profile__value">{user.dateOfBirth}</span>
            </div>)}

            {user.discordNickname && (<div className="profile__item">
                <span className="profile__label">Нікнейм в Діскорд:</span>
                <span className="profile__value">{user.discordNickname}</span>
            </div>)}

            {user.favouriteGenre && (<div className="profile__item">
                <span className="profile__label">Улюблений жанр ігор:</span>
                <span className="profile__value">{user.favouriteGenre}</span>
            </div>)}

            {user.sex && (<div className="profile__item">
                <span className="profile__label">Стать:</span>
                <span className="profile__value">{user.sex}</span>
            </div>)}

            {user.additionalInfo && (<div className="profile__item">
                <span className="profile__label">Додаткова інформація про користувача:</span>
                <span className="profile__value">{user.additionalInfo}</span>
            </div>)}

        </div>
    )
}

export default UserInfo