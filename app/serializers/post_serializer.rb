class PostSerializer
  include FastJsonapi::ObjectSerializer
  attributes :message, :image_url, :updated_at, :created_at

  attribute :favorited do |post, params|
    Favorite.where(user_id: params[:current_user].id, post_id: post.id).exists? ? true : false
  end

  attribute :nickname do |post|
    post.user.nickname
  end
end
