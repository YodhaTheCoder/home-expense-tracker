function CategoryList({
  categories,
  onEdit,
  onDelete,
  canModify
}) {

  return (
    <div className="card category-list-card">

      <div className="category-header">
        <div>
          <h3>
            Available Categories
          </h3>

          <p className="muted">
            Manage expense categories for your organization
          </p>
        </div>


        <span className="category-count">
          {categories.length} Categories
        </span>

      </div>



      <div className="category-grid">

        {categories.map((category) => (

          <div
            key={category.id}
            className="category-card"
          >


            <div className="category-top">


              <div className="category-icon">
                {category.name.charAt(0).toUpperCase()}
              </div>



              <div className="category-details">

                <h4>
                  {category.name}
                </h4>

<span
  className={`category-type ${
    category.isDefault ? 'default-type' : 'custom-type'
  }`}
>
  {category.isDefault ? 'Default' : 'Custom'}
</span>

              </div>


            </div>




            {canModify(category) && (

              <div className="category-actions">

  <button
    className="category-btn edit"
    onClick={() => onEdit(category)}
  >
    Edit
  </button>


  <button
    className="category-btn delete"
    onClick={() => onDelete(category)}
  >
    Delete
  </button>

</div>

            )}


          </div>

        ))}


      </div>


    </div>
  );
}


export default CategoryList;