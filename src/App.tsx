/*
 * @Author: Vir
 * @Date: 2021-09-08 14:22:02
 * @Last Modified by: Vir
 * @Last Modified time: 2021-12-24 10:14:55
 */

import React, { Suspense } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import GlobalLoading from './components/global/loading';
import routers, { Router } from './config/router';
import RenderContent from './components/global/renderContent';

// 处理路由数据
const Recursive = (routes: Router[], parent?: Router, basePath?: string) => {
  let list = routes;
  return list.map((i) => {
    const Element = (props: any) => {
      document.title = parent ? `${parent.title}-${i.title}` : i.title || '';
      const newProps = {
        ...props,
        route: i,
        pathname: `${basePath}/${i.path}`,
      };
      return (
        <RenderContent {...newProps}>
          {React.createElement(i.component, newProps)}
        </RenderContent>
      );
    };

    let pathname = basePath ? `${basePath}/${i.path}` : `/${i.path}`;

    return (
      <Route
        path={i.routes ? i.path : `${i.path}/*`}
        key={i.path}
        element={<Element />}
      >
        {i.routes ? Recursive(i.routes, i, pathname) : undefined}
      </Route>
    );
  });
};

function App(props: any) {
  return (
    <div className="App">
      <Suspense fallback={<GlobalLoading />}>
        <HashRouter>
          <Routes>{Recursive(routers)}</Routes>
        </HashRouter>
      </Suspense>
    </div>
  );
}

export default App;
