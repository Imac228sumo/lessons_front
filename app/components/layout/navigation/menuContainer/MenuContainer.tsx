import Menu from './Menu'
import GenreMenu from './genres/GenreMenu'
import { firstMenu, userMenu } from './menu.data'

const MenuContainer = () => {
	return (
		<div>
			<Menu menu={firstMenu} />
			<GenreMenu />
			<Menu menu={userMenu} />
		</div>
	)
}
export default MenuContainer
