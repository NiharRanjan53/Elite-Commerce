import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      <h2 className="text-center bg-light pt-2 pb-2">All Categories</h2>
      <div className="container">
        <div className="row">
          {categories.map((c) => (
            <div className="col-md-4 mt-4 mb-4" key={c._id}>
              <Link to={`/category/${c.slug}`} className="btn btn-primary">
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
