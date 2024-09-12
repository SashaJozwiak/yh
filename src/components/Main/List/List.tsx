import { useNav } from '../../../store/nav';

//import WebApp from '@twa-dev/sdk';
import s from './list.module.css'
import { ListCurrency } from './ListCurrency';
import { ListApps } from './ListApps';

export const List: React.FC = () => {
    const nav = useNav(state => state.nav.list);

    return (
        <div className={`${s.list} scrollable`}>
            {nav && <ListCurrency />}
            {!nav && <ListApps />}
        </div>
    )
}
