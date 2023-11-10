import Layout from "./components/misc/Layout";
import LoginPage from "./pages/Auth/Login.page";
import Landing from "./pages/Landing/Landing.page";
import NotFound from "./pages/Notfound/NotFound.page";
import CreatePostPage from "./pages/Post/CreatePost.page";
import ProtectedRoute from "./services/ProtectedRoute";
import useBoundStore from "./store/Store";
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";
import { PostPage, postsLoader } from "./pages/Post/Post.page";
import { PostDetailsPage , postDetailsLoader } from "./pages/Post/PostDetails.page";
import {Edit, postDetailsLoader2} from "./pages/Post/Edit.page";
import { Loader } from '@mantine/core';
import { Suspense } from 'react';
import {
  Await,
  defer,
  useLoaderData,
} from "react-router-dom";

function Loading(){
  return(
    <div>
    <Loader color="blue" />
    </div>
  )
}

export const Router = () => {
  const authCheck = useBoundStore((state) => {
    return state.user ? state.user : false;
  });
//HELP suspens and Loader does not work....


  /**
   * CLIENT-SIDE ROUTER
   *
   * [Public Pages]: Anyone can see these pages
   * / - Landing Page
   *
   * [Private Routes]: Must be authenticated to see
   * /login - Login Page
   * /posts - See All Posts
   * /posts/:id - See details of a specific post
   * /posts/create - Create a post
   *
   * /<unknown> - 404 Not Found
   */
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/posts/create"
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <CreatePostPage />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/posts"
          element={
            <Suspense fallback={<Loading />}>
              <Await
                errorElement={<p>Error at post</p>}
                loadingElement={<Loading />}
              >
                <ProtectedRoute isAllowed={!!authCheck}>
                  <PostPage />
                </ProtectedRoute>
              </Await>
            </Suspense>
          }
          loader={postsLoader}
        />
        
        <Route
          path="/posts/:id"
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <PostDetailsPage />
            </ProtectedRoute>
          }
          loader={postDetailsLoader}
        />
        <Route 
        path="/posts/:id/edit" 
        element={<Edit/>} 
        loader={postDetailsLoader2}/>

        <Route path="/" element={<Landing />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return router;
};
