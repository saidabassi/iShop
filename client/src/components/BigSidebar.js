import Wrapper from "../assets/wrappers/BigSidebar"
import { useAppContext } from "../JS/appContext";
import Logo from "./logo";
import NavLinks from "./NavLinks.js";


const BigSidebar = () => {
  const {showSidebar}= useAppContext()
  return (
    <Wrapper>
      <div className={showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'}>
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks/>

        </div>
      </div>
      </Wrapper>
  )
}

export default BigSidebar