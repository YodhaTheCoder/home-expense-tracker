function CategoryForm({
  categoryForm,
  setCategoryForm,
  editingCategoryId,
  setEditingCategoryId,
  addCategory,
  saveCategory,
}) {

  function handleSubmit(event) {

    event.preventDefault();


    if (editingCategoryId) {
      saveCategory(
        editingCategoryId,
        categoryForm.name
      );
    } else {
      addCategory(categoryForm.name);
    }


    setCategoryForm({
      name: '',
    });


    setEditingCategoryId(null);
  }



  return (

    <form className="category-form" onSubmit={handleSubmit}>

      <div className="field">

        <label>
          Category Name
        </label>


        <input

          value={categoryForm.name}

          onChange={(e)=>
            setCategoryForm({
              ...categoryForm,
              name:e.target.value,
            })
          }

          required

        />

      </div>



      <div className="inline-actions category-actions">


        <button

          className="btn btn-primary"

          type="submit"

        >

          {editingCategoryId
            ? 'Save Category'
            : 'Add Category'
          }

        </button>



        {editingCategoryId && (

          <button

            type="button"

            className="btn btn-secondary"

            onClick={()=>{
              setEditingCategoryId(null);

              setCategoryForm({
                name:'',
              });
            }}

          >

            Cancel

          </button>

        )}


      </div>


    </form>

  );
}


export default CategoryForm;