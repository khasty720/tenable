class Api::V1::FavoritesController < Api::V1::ApiController
  before_action :set_favorite, only: [:destroy]
  before_action :authenticate_user!

  # GET /favorites
  def index
    @favorites = current_user.favorite_posts

    render json: @favorites
  end

  # POST /favorites
  def create
    @favorite = Favorite.new(favorite_params)

    if @favorite.save
      render json: @favorite, status: :created, location: @favorite
    else
      render json: @favorite.errors, status: :unprocessable_entity
    end
  end

  # DELETE /favorites/1
  def destroy
    @favorite.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_favorite
      @favorite = Favorite.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def favorite_params
      params.require(:favorite).permit(:user_id, :post_id)
    end
end
