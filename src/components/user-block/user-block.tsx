import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import browserHistory from '../../browser-history';
import { AuthorizationStatus, AppRoute } from '../../const';
import { AppDispatch } from '../../store/store';
import { selectAuthInfo, selectAuthorizationStatus } from '../../store/user-process/selectors';
import { logout } from '../../store/user-process/user-process';

function UserBlock(): JSX.Element {
  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const { avatarUrl } = useSelector(selectAuthInfo);

  const dispatch = useDispatch<AppDispatch>();

  const handleSignOutClick = () => {
    dispatch(logout())
      .then(() => toast.success('Вы успешно вышли из аккаунта.'))
      .catch((error) => toast.error(error.message));
  };

  const handleAvatarClick = () => {
    browserHistory.push(AppRoute.MyList);
  };

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (
      <ul className="user-block">
        <li className="user-block__item">
          <div className="user-block__avatar" onClick={handleAvatarClick}>
            <img src={avatarUrl} alt="User avatar" width="63" height="63" />
          </div>
        </li>
        <li className="user-block__item">
          <Link className="user-block__link" to={AppRoute.Root} onClick={handleSignOutClick}>
            Sign out
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <div className="user-block">
      <Link className="user-block__link" to={AppRoute.Login}>
        Sign in
      </Link>
    </div>
  );
}

export default UserBlock;
