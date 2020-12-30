import React, { useEffect, useState } from "react";

export default function asyncComponent(loadComponent) {

    return function AsyncComponent(props) {
        const [Component, setComponent] = useState(null);


        useEffect(() => {

            typeof loadComponent === 'function' &&
                loadComponent()
                    .then(module => {
                        setComponent(() => module.default);
                    })
                    .catch(e => {
                        setComponent(null);
                    })


            return () => {
                setComponent(null);
            }
        }, [])

        return <div>
            {Component && <Component {...props} />}
        </div>
    }
}