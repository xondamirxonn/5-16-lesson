import React from 'react'

function NotFound()  {
  return (
    <body className='bg-warning' style={{padding: ".1px"}}>
      <div
        class="border border-light w-50 my-5 rounded-2 bg-light shadow-lg "
        style={{ margin: "auto" }}
      >
        <div
          class="d-flex gap-2 justify-content-end bg-warning p-3"
          style={{
            borderTopLeftRadius: ".5rem",
            borderTopRightRadius: ".5rem",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: "lime",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          ></div>
          <div
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: "yellow",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          ></div>
          <div
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: "red",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          ></div>
        </div>
        <h1 class="text-center" style={{ fontSize: "120px" }}>
          <code>ERROR</code>
        </h1>
        <h1 class="text-center" style={{ fontSize: "200px" }}>
          <code>404</code>
        </h1>
        <p class="text-center" style={{ fontSize: "50px" }}>
          Page Not Found
        </p>
      </div>
    </body>
  );
}

export default NotFound