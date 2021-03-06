import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { signOutStart } from '../../redux/user/user.actions'
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { selectCurrentUser } from '../../redux/user/user.selectors'

import { ReactComponent as Logo } from '../../assets/crown.svg'
import { HeaderContainer, OptionsContainer, LogoContainer, OptionLink } from './header.styles'

import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'


const Header = ({ currentUser, hidden, signOutStart }) => (
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo className='logo' />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>
                SHOP
            </OptionLink>
            <OptionLink to='/shop'>
                CONTACT
            </OptionLink>
            {
                currentUser ?
                    <OptionLink as='div' onClick={signOutStart}>SIGNOUT</OptionLink>
                    :
                    <OptionLink to='/signIn'>SIGN IN</OptionLink>
            }
            <CartIcon />
        </OptionsContainer>
        {
            hidden ? null : <CartDropdown />
        }
    </HeaderContainer>
)

// const mapStateToProps = (state) => ({
//     currentUser: selectCurrentUser(state),
//     hidden:selectCartHidden(state)
// })
// OR
const mapStateToProps = createStructuredSelector({//auto pass state to props 
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
})

//root-reducer->userReducer->currentUser value
export default connect(mapStateToProps, mapDispatchToProps)(Header);//connects header with userReducer