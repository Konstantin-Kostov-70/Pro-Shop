import React from "react";
import { Pagination, PageItem } from "react-bootstrap";

function Paginate({ pages, page, keyword = '', isAdmin, baseUrl = false }) {
   if (keyword) {
    keyword = keyword.split('?keyword=')[1].split('&')[0]
   }
 
  return (
    pages > 1 && (
      <Pagination className="mt-5 justify-content-center">
        
        {[...Array(pages).keys()].map((x) => (   
            <PageItem 
                active={x + 1 === page}
                key={x + 1}
                href={!isAdmin 
                  ? `/#/?keyword=${keyword}&page=${x + 1}`
                  : `${baseUrl}/#/?keyword=${keyword}&page=${x + 1}`
                  } 
              >      
                {x + 1}
            </PageItem>
        ))}
      </Pagination>
    )
  );
}

export default Paginate;
