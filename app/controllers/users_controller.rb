class UsersController < ApplicationController
  before_action :set_user, only: %i[ show edit update destroy ]

  # GET /users or /users.json
  def index
    @users = User.page(params[:page]).per(params[:limit])
    render json: {
        users: @users,
        meta: pagination_meta(@users)
    }, status: :ok
  end

  # GET /users/1 or /users/1.json
  def show
    render json: { user: @user }, status: :ok
  end

  # POST /users or /users.json
  def create
    @user = User.new(user_params)

    if @user.save
      render json: { user: @user }, status: :ok
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1 or /users/1.json
  def update
    if @user.update(user_params)
      render json: { user: @user }, status: :ok
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1 or /users/1.json
  def destroy
    @user.destroy
    head :no_content
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:name, :email, :title, :phone, :status)
  end
end
