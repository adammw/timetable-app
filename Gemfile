source 'https://rubygems.org'
ruby File.read(File.expand_path('../.ruby-version', __FILE__)).chomp || '2.0.0'

gem 'bundler', '>= 1.7.0'
gem 'puma'
gem 'rails', '4.2.0'
gem 'pg'

gem 'sprockets', '~> 2.12.3'
gem 'sprockets-traceur'
gem 'autoprefixer-rails'
gem 'uglifier', '>= 1.3.0'
gem 'sass-rails', '~> 5.0'
gem 'react-rails', '~> 1.0.0.pre', github: 'reactjs/react-rails'

gem 'therubyracer', platforms: :ruby
gem 'therubyrhino', platforms: :jruby

gem 'jquery-rails'
gem 'turbolinks'
gem 'active_model_serializers', '~> 0.8.3'
gem 'stronger_parameters'
gem 'faraday'
gem 'faraday_middleware'


source 'https://rails-assets.org' do
  gem 'rails-assets-pure'
  gem 'rails-assets-lodash'
end

group :development, :test do
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'byebug'
  gem 'did_you_mean'
  gem 'rspec-rails', '~> 3.0'
  gem 'spring'
  gem 'web-console', '~> 2.0'
end

group :production do
  gem 'rails_12factor'
end
