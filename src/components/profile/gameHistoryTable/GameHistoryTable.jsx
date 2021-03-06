import React from 'react';

import './GameHistoryTable.scss';
import RouteHelper from '../../router/RouteHelper';
import {statusesSettings} from '../../../constants/gameResultStatuses';
import {Routes} from '../../../constants/routes';

export default class GameHistoryTable extends React.Component {

    onRowClick = game => RouteHelper.historyPush(Routes.profile, {id: game.opponentId});

    render() {
        const dateFormatter = new Intl.DateTimeFormat('ru', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        });

        return (
            <div className='game-history-table-container'>
                <table>
                    <thead>
                    <tr>
                        <th>
                            Result
                        </th>
                        <th>
                            Date
                        </th>
                        <th>
                            Opponent
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.games.map(game =>
                        <tr key={game.date} onClick={() => this.onRowClick(game)}>
                            <td className={statusesSettings[game.status].style}>
                                {statusesSettings[game.status].text}
                            </td>
                            <td>
                                {dateFormatter.format(game.date)}
                            </td>
                            <td>
                                {game.opponentName}
                            </td>
                        </tr>
                    )}
                    {this.props.games.length === 0 &&
                    <tr>
                        <td colSpan={3}>
                            Game history is empty
                        </td>
                    </tr>
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}
