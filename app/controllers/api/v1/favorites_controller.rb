class Api::V1::FavoritesController < Api::V1::ApiController
  before_action :authenticate_user!

  # GET /favorites
  def index
    @favorite_posts = current_user.favorite_posts.order(created_at: :desc)

    render json: PostSerializer.new(@favorite_posts, {params: {current_user: current_user}}).serializable_hash
  end

  # POST /favorites
  def create
    @favorite = current_user.favorites.new(favorite_params)

    if @favorite.save
      render json: @favorite, status: :created, location: @favorite
    else
      render json: @favorite.errors, status: :unprocessable_entity
    end
  end

  def remove
    @favorite = current_user.favorites.find_by_post_id(params[:post_id])
    @favorite.destroy
  end

  private
    # Only allow a trusted parameter "white list" through.
    def favorite_params
      params.require(:favorite).permit(:user_id, :post_id)
    end
end
