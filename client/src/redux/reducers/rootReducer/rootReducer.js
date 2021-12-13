import { combineReducers } from 'redux';
import LoginUserReducer from '../LoginUserReducer';
import RegisterUserReducer from '../RegisterUserReducer';
import UserProfileReducer from '../UserProfileReducer';
import AllCountriesReducer from '../AllCountriesReducer';
import CountriesByRegionReducer from '../CountriesByRegionReducer';
import CountriesBySearchReducer from '../CountriesBySearchReducer';
import GetUserListReducer from '../GetUserListReducer';
import SaveUserListReducer from '../SaveUserListReducer';
import ThemeReducer from '../ThemesReducer';
import SidebarReducer from '../SidebarReducer';
import NavbarRedirectReducer from '../NavbarRedirectReducer';

const rootReducer = combineReducers({
  LoginUserResponse: LoginUserReducer,
  RegisterUserResponse: RegisterUserReducer,
  GetUserProfile: UserProfileReducer,
  getAllCountries: AllCountriesReducer,
  getCountriesByRegion: CountriesByRegionReducer,
  getCountriesBySearch: CountriesBySearchReducer,
  GetUserListResponse: GetUserListReducer,
  SaveUserListResponse: SaveUserListReducer,
  ActiveTheme: ThemeReducer,
  sibarStatus: SidebarReducer,
  navigationResponse: NavbarRedirectReducer
});
export default rootReducer;
