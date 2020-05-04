    <!-- Content Area -->
    <div class="row">
      <div class="col-sm-6 col-xs-12 mobile-col">
        <div class="page-title dashboard-title">
          <h3 class="pagetitle-label">
            <span class="iconlabel icon-title icon-listadmin"> </span> 
            <span> List of Box </span> 
          </h3>
        </div>
      </div>
    </div>


    <div class="content" >
      <div class="col-lg-12 col-sm-12 col-xs-12 alert alert-success" ng-show="{{successMessage }} ">
        <strong>{{successMessage }}</strong>
      </div>
      <!-- DataTables Data -->
      <div class="card mb-3">
        <div class="card-body" ng-controller="BoxController">
          <div class="tablewrapper table-data">
            <div class="card-body">
              <div class="table-responsive">
                <div class="pull-right" style="padding-top:30px">
                  <div class="box-tools" style="display:inline-table">
                    <div class="input-group">
                      <input type="text" class="form-control input-sm ng-valid ng-dirty" placeholder="Search" ng-change="searchDB()" ng-model="searchText" name="table_search" title="" tooltip="" data-original-title="Min character length is 1">
                      <span class="input-group-addon">Search</span>
                    </div>
                  </div>
                </div>
                <table class="table table-bordered dataTable"  id="dataTable" width="100%" cellspacing="0">
                  <thead>
                    <tr>
                      <th ng-click="sortBy('name')">Box Number</th>
                      <th>activePackage</th>
                      <th>Assigned To Agency</th>
                      <th>Created On</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                   <tr ui-sortable dir-paginate="value in data | itemsPerPage:500 | orderBy:sortField:reverseOrder" total-items="totalItems">
                    <td>{{ value.boxNumber }}</td>
                    <td>{{ value.activePackage }}</td>
                    <td>{{ value.assignedTo }}</td>
                    <td>{{ value.createdOn }}</td>
            <!-- <td>
            <button data-toggle="modal" ng-click="edit(value.id)" data-target="#edit-data" class="btn btn-primary">Edit</button>
            <button ng-click="remove(value,$index)" class="btn btn-danger">Delete</button>
          </td> -->
          <td width="120">
            <div class="action-btns">
              <span> <a href="#" onclick="return false;" ng-click="edit(value,$index)" data-toggle="modal" data-target="#edit-data" class="edit-btn"> <i class="fa fa-edit icon-sprit edit-icon"></i></a> </span>
              <span> <a href="#" onclick="return false;" ng-click="remove(value,$index)" class="trash-btn"> <i class="fa fa-trash icon-sprit remove-icon"></i></a> </span>
            </div>
          </td>
        </tr>

      </tbody>
    </table>

  </div>
</div>
</div>
<!--tablewrapper-->
<div class="modal fade" id="edit-data" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <form method="POST" name="addNewAdminFrom" role="form" ng-submit="saveEdit()">
        <input ng-model="form.userID" type="hidden" placeholder="Name" name="userID" class="form-control" />
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
          <h4 class="modal-title" id="myModalLabel">Update Box Details</h4>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col-xs-12 col-sm-6 col-md-6">
                <div class="firstname-field input-field form-group">
                  <label for="inputfstname" class="required">Box Number <span>*</span></label>
                  <input  ng-minlength="2" ng-maxlength="25" type="text" ng-model="form.name" name="name" id="name" class="form-control" placeholder="Full Name" required="required" >
                  <span ng-show="addNewAdminFrom.name.$touched && addNewAdminFrom.name.$error.required">Box Number name is required.</span>
                  <span ng-show="addNewAdminFrom.name.$touched && addNewAdminFrom.name.$error.minlength">Box Number should be contain min 2 chars.</span>
                  <span ng-show="addNewAdminFrom.name.$touched && addNewAdminFrom.name.$error.maxlength">Box Number should be contain max 25 chars.</span>
                </div> 
              </div>
            </div>
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="submit" ng-disabled="addNewAdminFrom.$invalid" class="btn btn-primary create-crud">Update</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
</div>
</div>
<!-- Create Modal -->

<!-- End Content-->


