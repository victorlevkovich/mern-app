import React from 'react';
import { Link } from 'react-router-dom';

const LinksList= ({ links }) => {
    return (
        <table className="responsive-table">
            <thead>
            <tr>
                <th>#</th>
                <th>Original link</th>
                <th>Reduced link</th>
                <th>Open</th>
            </tr>
            </thead>

            <tbody>
            {links.map((link, i) => {
                return (
                <tr key={link.code}>
                    <td>{i + 1}</td>
                    <td style={{maxWidth: '800px', overflow: 'hidden', textOverflow: 'ellipsis'}}>{link.from}</td>
                    <td>{link.to}</td>
                    <td>
                        <Link to={`/details/${link._id}`}>Open</Link>
                    </td>
                </tr>
                )
            })}
            </tbody>
        </table>
    )
}

export default LinksList;